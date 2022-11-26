import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showSuccessMsg, showErrMsg } from '../../../utils/notification/Notification'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/adminAction'
import { Link } from 'react-router-dom'
import { getDataAPI } from '../../../utils/fetchData'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'



const initialState = {
    err: '',
    success: ''
}

function GetUsersInfo() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.auth.token)

    const users = useSelector(state => state.admin.users)

    const { user } = auth
    const [data, setData] = useState(initialState)
    const { err, success } = data
    const [result, setResult] = useState([])


    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        fetchAllUsers(token).then(res => {
            dispatch(dispatchGetAllUsers(res))
        })
    }, [token, dispatch, callback])

    const handleDelete = async (id) => {
        try {
            if (user._id !== id) {
                if (window.confirm("Are you sure you want to delete this account?")) {
                    setLoading(true)
                    await axios.delete(`/api/delete/${id}`, {
                        headers: { Authorization: token }
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!search) return;

        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setResult(res.data.users);
            console.log(res.data.users);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            })
        }
    }
    const handleClose = () => {
        setSearch('')
        setResult([])
    }

    return (
        <>
            <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
            </div>
            <form className="search_form" onSubmit={handleSearch}>
                <h4 className='text-white text-center my-3'>Search by username</h4>
                <input type="text" name="search" value={search} id="search" title="Enter to Search"
                    onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} style={{ height: "40px" }} />

                <div className="search_icon" style={{ opacity: search ? 0 : 0.3, marginTop: "8px", fontSize: "20px" }}>
                    <span className="material-icons" style={{ fontSize: "20px" }}>search</span>
                    <span>Enter to Search</span>
                </div>

                <div className="close_search" onClick={handleClose}
                    style={{ opacity: result.length === 0 ? 0 : 1 }} >
                    &times;
                </div>

                <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>
            <table id="example" className="table table-striped table-bordered customers">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        search &&
                            result ?
                            result.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        {
                                            user.role === "admin"
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                        }
                                    </td>
                                    <td>

                                        <Link to={`/edit_role/${user._id}`}>
                                            <i className="fas fa-edit" title="Edit"></i>
                                        </Link>

                                        <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>
                                    </td>
                                </tr>
                            )) :
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>

                                    <td>
                                        {
                                            user.role === "admin"
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                        }
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-center'>
                                            <Link to={`/edit_role/${user._id}`} className="my-auto">
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>

                                            <Link to={`/profile/${user._id}`} className='mx-2 h5 mt-4 h-50 my-auto'>
                                                <i class="far fa-address-card"></i>
                                            </Link>

                                            <i className="fas fa-trash-alt h-50 my-auto" title="Remove"
                                                onClick={() => handleDelete(user._id)} ></i>
                                        </div>
                                    </td>
                                </tr>
                            ))



                    }
                </tbody>
            </table>


        </>
    )
}

export default GetUsersInfo