import { Button } from '@/components/ui/button'
import { IoIosSend } from 'react-icons/io'

function InfoSection({ trip }) {

    return (
        <div>
            <img src="/placeholder.jpg" alt="placeholder" className='h-[340px] w-full object-cover rounded-xl' />
            <div className='flex justify-between items-center mt-5'>
                <div className='mt-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-3'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip.userSelection?.noOfdays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂No. of Travellers {trip.userSelection?.traveler} </h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}

export default InfoSection
