import { useState } from 'react';
import style from './Form.module.css';

function Form(){
    const [age, setAge] = useState(5); //useState for age;
    const [name, setName] = useState(''); // useState for FIO;

    const [formValid, setFormValid] = useState(false);
    const [message, setMessage] = useState('');

    const  ageOptions = new Array(100).fill(0).map((el, i) => i).filter(el => el > 2 && el < 100);
    
    const options = ageOptions.map((age, index) => {
        return <option key={index}>{age}</option>
    });

    const nameCheck = (event) => {
         setName(event.target.value);

        const regExpName = /^[а-яА-Яa-zA-Z\-\ ]+$/

        if(!regExpName.test((event.target.value))){
            setMessage('Неверно введено ФИО');
        }else{
            setFormValid(true);
            setMessage('Успешно');
        }
    };

    const sendForm = (event) => {
        event.preventDefault();
    }

    const newUser = {
        fio: name,
        age: age
    }

    fetch('127.0.0.1:3000/api', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    
    return (
        <div className="container">
            <form onSubmit = {sendForm} className={style.loginForm}>
                <div className="row">

                    <div className="mb-3 col-lg-6 col-12 col-md-12 my-auto">
                        {formValid ? <div style={{color:'green'}}></div> : <div style={{color:'red'}}></div>}
                        <label htmlFor="YourName" className="form-lable">ФИО</label>
                        <input value={name} onChange={(event) => nameCheck(event)} type="text" className="form-control" placeholder="Введите ФИО"/> 
                    </div>

                    <div className="mb-3 col-lg-6 col-12 col-md-12 my-auto">
                        <label htmlFor="YourAge" className="form-lable">Возраст</label>
                        <select className="form-select" value={age} onChange={(event) => setAge(event.target.value)}>
                            {options}
                        </select>
                    </div>

                    <div className="mb-3 text-center">
                        <button disabled={!formValid} type="submit" className="btn btn-success">Отправить</button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default Form;