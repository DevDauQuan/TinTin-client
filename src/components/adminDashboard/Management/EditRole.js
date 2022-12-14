import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { showSuccessMsg, showErrMsg } from '../../../utils/notification/Notification'


function EditRole() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.admin.users)
    const token = useSelector(state => state.auth.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if (users.length !== 0) {
            users.forEach(user => {
                if (user._id === id) {
                    setEditUser(user)
                    setCheckAdmin(user.role === "admin" ? true : false)
                }
            })
        } else {
            navigate('/profile')
        }
    }, [users, id, navigate])

    const handleUpdate = async () => {
        try {
            if (num % 2 !== 0) {
                const res = await axios.patch(`/api/update_role/${editUser._id}`, {
                    role: checkAdmin ? "admin" : "user"
                }, {
                    headers: { Authorization: token }
                })

                setSuccess(res.data.msg)
                setNum(0)
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    return (
        <div className="profile_page edit_user">


            <div className="col-left">
                <h2>Edit User</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={editUser.fullname} disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" defaultValue={editUser.email} disabled />
                </div>

                <div className="form-group">
                    <input type="checkbox" id="isAdmin" checked={checkAdmin}
                        onChange={handleCheck} />
                    <label htmlFor="isAdmin">isAdmin</label>
                </div>

                <div className="row d-flex btn_edit justify-content-between">
                    <button onClick={() => navigate(-1)} >
                        <i className="fas fa-long-arrow-alt-left"></i> Go Back
                    </button>
                    <button onClick={handleUpdate}>Update</button>
                </div>

                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>
        </div>
    )
}

export default EditRole