import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from "@/service/AIModal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useNavigate();
    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleSearch = async (input) => {
        setQuery(input);

        if (input.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://us1.locationiq.com/v1/autocomplete`,
                {
                    params: {
                        key: import.meta.env.VITE_LOCATIONIQ_API_KEY, // Store API key in .env file
                        q: input,
                        format: "json",
                    }
                }
            );

            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    });

    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfdays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("Please fill all the fields");
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace("{location}", formData?.location?.label || formData?.location)
            .replace("{totalDays}", formData?.noOfdays)
            .replace("{traveler}", formData?.traveler)
            .replace("{budget}", formData?.budget)
            .replace("{totalDays}", formData?.noOfdays);
        // console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    };

    const GetUserProfile = (tokenInfo) => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: "application/json",
                },
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res.data));
                setOpenDialog(false);
                OnGenerateTrip();
            })
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AItrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        router('/view-trip/' + docId);
    };


    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        What is your destination of choice?
                    </h2>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter destination..."
                    />

                    {/* Autocomplete Suggestions */}
                    {suggestions.length > 0 && (
                        <ul className="border rounded-lg mt-2 bg-white">
                            {suggestions.map((place, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => {
                                        setQuery(place.display_name);
                                        setPlace(place);  // Store selected place
                                        setSuggestions([]);
                                        handleInputChange('location', { label: place.display_name, data: place });
                                    }}
                                >
                                    {place.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        How many days are you plannig to stay?
                    </h2>
                    <Input placeholder={'Ex.3'} type="number"
                        onChange={(e) => handleInputChange('noOfdays', e.target.value)}
                    />
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        What is your budget?
                    </h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        Who do you plan on traveling with on your next adventure?
                    </h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelesList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'} `}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-10 justify-end flex mb-8">
                <Button disabled={loading} onClick={OnGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Trip"
                    }
                </Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="logo" />
                            <h2 className='font-bold text-lg mt-5'>Sign In With Google</h2>
                            <p>Sign In to the App with Google authentication secrely</p>
                            <Button className="w-full mt-5 flex gap-4 items-center" onClick={login}>
                                <FcGoogle className="h-7 w-7" />
                                Sign In</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div >
    );
}

export default CreateTrip;
