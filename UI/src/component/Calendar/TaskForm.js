import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Select from 'react-select'
import { CalendarContext } from "../../context/CalendarContext";
import { CirclePicker } from "react-color";
import "../../Taskform.css"

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

function TaskForm(props) {

    const { date, task, setTask, saveTask, setDate, deleteTask } =  useContext(CalendarContext);

    const [name, setName] = useState("");
    const [color, setColor] = useState("#d2635b");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("To do");
    const [priority, setPriority] = useState("Normal");
    const [comment, setComment] = useState("");
    const [userEmail, setUserEmail] = useState(props.email);
    const [File, setFile] = useState("");
    const [FilePicked, setFilePicked] = useState(false);

    const statusOptions = [
        { value: 'To do', label: 'To do'},
        { value: 'Doing', label: 'Doing'},
        { value: 'Done', label: 'Done'}
    ]

    const priorityOptions = [
        { value: 'Primary', label: 'Primary'},
        { value: 'Urgent', label: 'Urgent'},
        { value: 'Normal', label: 'Normal'},
        { value: 'No rush', label: 'No rush'}
    ]

    var statusColor = {
        'To do': "#E57373",
        'Doing': "#DCE775",
        'Done' : "#9FA8DA"
    }

    var priorityColor = {
        'Primary': "#FF8A80",
        'Urgent': "#FF8A65",
        'Normal' : "#9CCC65",
        'No rush' : "#4DB6AC",
    }

    useEffect(() => {
        if (task) {
            setName(task.name || "");
            setColor(task.color || "#d2635b");
            setStatus(task.status || "To do");
            setPriority(task.priority || "Normal");
            setComment(task.comment || "");
        }
        console.log(task);
    }, [task]);

    const closeModal = () => {
        setTask(null);
        setError(false);
    };

    const _saveTask = async() => {

        if(name.trim().length < 1) {
            setError(true);
            return;
        }
        setError(false);

        await saveTask({
            ...task,
            date: date,
            name: name,
            color: color,
            status: status,
            priority: priority,
            comment: comment,
            userEmail: userEmail,

        });
        await setDate(date);
        closeModal();

    };

    const _deleteTask = async()=> {
        await deleteTask(task.id);
        await setDate(date);
        closeModal();
        setError(false);
    }

    const changeHandler = (event) => {
        setFile(event.target.files[0]);
        setFilePicked(true);
    };

    return (
        <Modal
            isOpen={task != null}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Task Form"
        >
            <div className="task-form">

                <label>Name</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Task Name"
                />
                <label>Color</label>

                <div>
                    <CirclePicker
                        color={color}
                        onChange={(color) => {
                            setColor(color.hex);
                        }}
                    />
                </div>
                <label>Status</label>
                <div>
                    <div className="square" style = {{backgroundColor : statusColor[status]}}>
                        <p className="square-text">{status}</p>
                    </div>
                    <Select options={statusOptions} onChange = {(event) => setStatus(event.value)}/>
                </div>

                <label>Priority</label>
                <div>
                    <div className="square" style = {{backgroundColor : priorityColor[priority]}}>
                        <p className="square-text">{priority}</p>
                    </div>
                    <Select options={priorityOptions} onChange = {(e) => setPriority(e.value)} />
                </div>

                <label>Comments</label>
                <input
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Task comment"
                />

                <label>Attachments</label>
                <div>
                    <input type="file" name="file" onChange={changeHandler} className="custom-input"/>
                    {FilePicked ? (
                        <div>
                            <p className="file-text">Filename: {File.name}</p>
                            <p className="file-text">Filetype: {File.type}</p>
                            <p className="file-text">Size in bytes: {File.size}</p>
                            <p className="file-text">
                                lastModifiedDate:{' '}
                                {File.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div>
                    <button className="button button-red" onClick={closeModal}>
                        Cancel
                    </button>
                    {task && task.id ? (
                        <button
                            className="button button-orange"
                            onClick={_deleteTask}>
                            Delete
                        </button>
                    ) : null}
                    <button
                        className="button button-green"
                        onClick={_saveTask}>
                        Save
                    </button>
                </div>
                {error ? <p className="error">The name of the task is required</p> : null}
            </div>
        </Modal>
    );
}

export default TaskForm;
