import { useAuth, } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { METHODS } from "http";

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
const ProfessorHome = () => {
    const { auth, setAuth } = useAuth();
    const [rooms, setRooms] = useState<Room[]>([]);
    const getRooms = async () => {
        try {
            const response = await axios.get('rooms')
            setRooms(response.data._embedded.rooms);
        }
        catch (error) {
            console.error(error)
        }
        console.log('done')
    }
    const [refreshDependensies, setRefreshDependensies] = useState(true);
    const refresh = () => {
        setRefreshDependensies(!refreshDependensies);
    }
    useEffect(() => {
        getRooms();
        console.log(rooms)
    }, [refreshDependensies])
    const addRoom = async () => {
        try {
            await axios.post(
                'rooms',
                JSON.stringify({
                    program: "ITE",
                    course: "Web programming 2",
                    professorClass: " 1",
                    time: "2024-06-15T18:18:48.168Z",
                    name: "react"
                })
            )
            console.log('room added successfully')
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="App" >
            <header className="App-header">
                <h1>
                    hello Professor {auth.user.name}
                </h1>
                <ul>
                    <button onClick={refresh}>refresh</button>
                    {rooms.map((room, index) => (
                        <li key={index}>
                            <h3>name: {room.name}</h3>
                            <h5>{room.program} - {room.course}</h5>
                            <h5>{room.time}</h5>
                        </li>
                    ))}
                </ul>
                <button onClick={addRoom}>add a room</button>
            </header>
        </div>
    );
}
export default ProfessorHome;