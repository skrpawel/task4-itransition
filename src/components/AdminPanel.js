import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { CgLockUnlock } from 'react-icons/cg';
import { AiOutlineUserDelete } from 'react-icons/ai';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";



const url = 'https://task-4-itranistion-backend.herokuapp.com'
// const url = 'http://localhost:5001'

//TODO
// Redirect to '/' after current logged user is deleted or blocked 

const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    // const [isAcitve, setIsActive] = useState(true)

    const cookies = new Cookies();


    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map(li => li._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleChange = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const deleteUser = () => {
        axios.post(`${url}/deleteUser`, {
            checkedUsers: isCheck,
        }).then((response) => {
            alert("User deleted");
            logoutUser();
        });
    };

    const blockUser = () => {
        axios.post(`${url}/blockUser`, {
            checkedUsers: isCheck,
        }).then((response) => {
            alert("User blocked");
            logoutUser();
        });
    };

    const unblockUser = () => {
        axios.post(`${url}/unblockUser`, {
            checkedUsers: isCheck,
        }).then((response) => {
            alert("User active");
        });
    };

    useEffect(() => {
        axios.get(`${url}/admin_panel`).then(res => {
            setUsers(res.data);
        })
    }, []);

    const logoutUser = () => {
        const currentUserMail = getCurrentUser();

        users.forEach(function (user, index, array) {

            if (Object.values(isCheck).includes(user._id) && user.email === currentUserMail) {
                cookies.remove('TOKEN', { path: '/' });
                localStorage.clear();
            }
        });


    }

    const getCurrentUser = () => {
        const mail = localStorage.getItem('_id');
        return mail;
    }

    return (
        <div className="d-flex-column">
            <div className="btn-group btn-group-lg m-5 d-flex" role="group" aria-label="Send">
                <button type="button" className="btn btn-danger" onClick={blockUser}>Block</button>
                <button type="button" className="btn btn-success" onClick={unblockUser}>{<CgLockUnlock />} </button>
                <button type="button" className="btn btn-warning" onClick={deleteUser} >{<AiOutlineUserDelete />}</button>
            </div>


            <div className="mw-1280px">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input
                                    type='checkbox'
                                    name='select_all'
                                    onClick={handleSelectAll}
                                    isChecked={isCheckAll}
                                /></th>
                            <th scope="col">ID</th>
                            <th scope="col">name</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">last login time</th>
                            <th scope="col">registration time</th>
                            <th scope="col">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <th scope="row">
                                        <input
                                            type='checkbox'
                                            name={user.email}
                                            id={user._id}
                                            checked={isCheck.includes(user._id)}
                                            onChange={handleChange}
                                        />
                                    </th>
                                    <th>{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.login_date}</td>
                                    <td>{user.registration_date}</td>
                                    <td>{user.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default AdminPanel;