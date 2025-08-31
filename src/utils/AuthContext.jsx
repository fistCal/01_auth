import { useContext, useState, useEffect, createContext} from "react";
import {account} from '../appwriteConfig'
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
       userStatus()
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(true)
        try{
            const response = await account.createEmailPasswordSession({
                email: userInfo.email,
                password: userInfo.password
            })
            const accountDetails = await account.get()
            setUser(accountDetails)

        }catch(error){
            console.error(error);
            
        }
        setLoading(false)
    }

    const logout = async () => {
        await account.deleteSession({          //as per new Appwrite version
            sessionId: ""
        })            
        setUser(null)
    }

    const registerUser = async (userInfo) => {
        setLoading(true)
        try{
            await account.create({
                userId: ID.unique(),
                email: userInfo.email,
                password: userInfo.password1,
                name: userInfo.name
            })
            await account.createEmailPasswordSession({
                email: userInfo.email,
                password: userInfo.password1
            })
            const accountDetails = await account.get()
            setUser(accountDetails)

        }catch(err){
            console.error(err)
        }
        setLoading(false)
    }

    const userStatus = async () => {
        try{
            const accountDetails = await users.get({
                userId: ID.unique()
            });
            setUser(accountDetails)
        }catch(error){
            console.log("no active users");
            
        }
        setLoading(false)
    }

    const contextData = {
        user,
        loginUser,
        logout,
        registerUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
export default AuthContext