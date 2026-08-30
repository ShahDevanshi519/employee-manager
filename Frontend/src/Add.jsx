import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Add(){
    const [data,setData] = useState({
        name:"",
        email:"",
        mobile:"",
        password:""
    });

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://127.0.0.1:3000/add/api",data);

            if(res.data.flag === 1){
                alert(res.data.msg);
                setData({
                    name:"",
                    email:"",
                    mobile:"",
                    password:""
                });
                navigate('/display');
            }

        }catch(err){
            alert(err.response?.data.msg);
        }
    }

    return(<>
    <form onSubmit={handleSubmit}>
        Name:<input type="text" name="name" value={data.name} onChange={(e) => {setData({...data,name:e.target.value})}}/><br/><br/>
        Email:<input type="email" name="email" value={data.email} onChange={(e) => {setData({...data,email:e.target.value})}}/><br/><br/>
        Mobile:<input type="text" name="mobile" value={data.mobile} onChange={(e) => {setData({...data,mobile:e.target.value})}}/><br/><br/>
        Password:<input type="password" name="password" value={data.password} onChange={(e) => {setData({...data,password:e.target.value})}}/><br/><br/>
        <button type="submit">Add Data</button>
    </form>
    </>)
}

export default Add