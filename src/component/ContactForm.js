import React, { useState } from 'react'

export default function ContactForm() {
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        mobile: "",
        message: "",
    });

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value })
    };


    const postData = async (event) => {
        event.preventDefault();
        const { fullname, email, mobile, message } = user //object destrucring

        if (fullname && email && mobile && message) {
            const response = await fetch('https://react-contact-form-5d8e6-default-rtdb.firebaseio.com/contactform.json', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    mobile,
                    message,
                }),
            })
            if (response) {
                setUser({
                    fullname: "",
                    email: "",
                    mobile: "",
                    message: "",
                });
                alert("Data Stored Successfully !")
            }
        } else {
            alert("Please fill all the data")
        }


    }

    return (
        <>
            <div className="container my-4 col-10 mx-auto">
                <h1>Contact Form</h1>
                <form className="my-4" onSubmit={postData} method="POST">
                    <div className="row ">
                        <div className="col-sm-12 col-md-6">
                            <div className="form-floating mb-3">
                                <input name="fullname" value={user.fullname} type="text" className="form-control" id="floatingInputText" onChange={handleInput} />
                                <label for="floatingInputText">Your Full Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="email" value={user.email} type="email" className="form-control" id="floatingInputEmail" onChange={handleInput} />
                                <label for="floatingInputEMail">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="mobile" value={user.mobile} type="number" className="form-control" id="floatingInputMobile" onChange={handleInput} />
                                <label for="floatingInputMobile">Mobile number</label>
                            </div>

                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="form-floating">
                                <textarea name="message" className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: 207 }} value={user.message} onChange={handleInput}></textarea>
                                <label for="floatingTextarea2">Comments</label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary my-4">Submit </button>

                </form>
            </div>
        </>
    )
}
