import Login from "./Login";
import Register from "./Register";
import "bootstrap/dist/css/bootstrap.min.css";


const Main = () => {
    return (
        <div className="container" >
            <Register />
            <Login />
        </div>
    );
}

export default Main;