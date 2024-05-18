import { useAuth } from "../../context/AuthProvider";
import { useState,useEffect } from "react";
import axios from "../../api/axios";
interface Room {
    "name": "string",
    "program": "string",
    "course": "string",
    "professorClass": "string",
    "time": "2024-05-14T17:37:41.967Z",
    "status": "string",
    "broadcasterName": "string",
    "_links": {
        "additionalProp1": {
            "href": "string",
            "hreflang": "string",
            "title": "string",
            "type": "string",
            "deprecation": "string",
            "profile": "string",
            "name": "string",
            "templated": true
        },
        "additionalProp2": {
            "href": "string",
            "hreflang": "string",
            "title": "string",
            "type": "string",
            "deprecation": "string",
            "profile": "string",
            "name": "string",
            "templated": true
        },
        "additionalProp3": {
            "href": "string",
            "hreflang": "string",
            "title": "string",
            "type": "string",
            "deprecation": "string",
            "profile": "string",
            "name": "string",
            "templated": true
        }
    }
}
const StudentHome = () => {
    const {auth, setAuth } = useAuth();
    const [rooms, setRooms] = useState<Room[]>([]);
    const getRooms = async () => {
        try {
            const response = await axios.get('rooms');
            setRooms(response.data._embedded.rooms);
        }
        catch (error) {
            console.error(error)
        }
        console.log('done')
    }
    const [refreshDependensies, setRefreshDependensies] = useState(true);
    const refresh = ()=>{
        setRefreshDependensies(!refreshDependensies);
    }
    useEffect(() => {
        getRooms();
        console.log(rooms);
    }, [refreshDependensies])
    return (
        <div className="App" >
            <header className="App-header">
                <h1>
                    hello {auth.user.name} student
                </h1>
                <ul>
                    <button onClick={refresh}>refresh</button>
                    {rooms.map((room, index)=>(
                        <li key={index}>
                            <h3>name: {room.name}</h3>
                            <h5>{room.program} - {room.course}</h5>
                            <h5>{room.time}</h5>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    )
}
export default StudentHome;