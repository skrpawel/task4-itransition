import axios from "axios";
import { useEffect, useState } from "react";
import styles from './AdminPanel.module.css'
// import { useNavigate } from "react-router-dom";
import { CgLockUnlock } from 'react-icons/cg';
import { AiOutlineUserDelete } from 'react-icons/ai';


const url = 'https://task-4-itranistion-backend.herokuapp.com'


const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    // const [isCheckAll, setIsCheckAll] = useState(false);
    // const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    // const navigate = useNavigate();

    useEffect(() => {
        setList(users.email);
    }, [users.email]);


    const handleChange = (e) => {
        const { name, checked } = e.target;

        if (name === 'select_all') {
            let temp = users.map(user => {
                return { ...user, isChecked: checked };
            });
            return setUsers(temp);
        }

        let temp = users.map(user => user.email === name ? { ...user, isChecked: checked } : user);
        return setUsers(temp);
    }

    const blockUser = (e) => {
        users.map((user) => {
            if (user.isChecked) {
                alert(`Block user ${user.email}`);
                console.log(list);
            }

            return user;
        })
    }

    useEffect(() => {
        axios.get(`${url}/admin_panel`).then(res => {
            setUsers(res.data);
        })
    }, []);



    return (
        <>
            <div className="btn-group btn-group-lg" role="group" aria-label="Send">
                <button type="button" className="btn btn-danger" onClick={blockUser}>Block</button>
                <button type="button" className="btn btn-success">{<CgLockUnlock />}</button>
                <button type="button" className="btn btn-warning">{<AiOutlineUserDelete />}</button>
            </div>


            <div className={styles.container}>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input
                                    type='checkbox'
                                    name='select_all'
                                    onClick={handleChange}
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
                                            checked={user?.isChecked || false}
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
        </>
    );
}

export default AdminPanel;