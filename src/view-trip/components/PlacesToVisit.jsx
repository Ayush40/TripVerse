import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-lg">Places To Visit</h2>
            <div>
                {trip?.tripData?.travelPlan?.itinerary?.map((item, index) => (
                    <div className="mt-5">
                        <h2 className="font-medium text-lg">Day {item.day}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.plan?.map((place, placeIndex) => (
                                <div>
                                    {/* <h2 className="font-medium text-sm text-orange-600">{place.time}</h2> */}
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
