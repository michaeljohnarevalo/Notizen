import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitUI from "../components/RateLimitUI";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";

const HomePage=()=>{
    const [IsRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading,setLoading] = useState(true);


    //fetch
    useEffect(()=>{
        const fetchNotes = async ()=>{
            try{
                //axios
                //const res = await axios.get("http://localhost:5001/api/notes"); 
                const res = await api.get("/notes"); 

               // const res = await fetch("http://localhost:5001/api/notes");
               // const data = await res.json
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            } catch(error){
                console.log("error fetching notes", error)
                if(error.response?.status === 429){
                    setIsRateLimited(true)
                }else{
                    toast.error("Failed to load notes")
                }
            } finally{
                setLoading(false)
            }
        }

        fetchNotes();
    },[])

    return(
        <div className="min-h-screen">
            <Navbar />
            {IsRateLimited && <RateLimitUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading Notes ...</div>}

                {notes.length === 0 && !IsRateLimited && <NotesNotFound/>}

                {notes.length > 0 && !IsRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))}  
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage