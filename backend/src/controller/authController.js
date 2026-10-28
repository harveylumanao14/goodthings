import { _generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // create a user

    // check if the user exists

    const user = await user

    // pass the user.id to _generateToken and generate jwt token
    const token = _generateToken(user.id, res)

    res.status(200).json({
        status: "success",
        data: creds
    });
}

const login = async (req, res) => {
    const { name, email, password } = req.body;

    const creds = [
        {
            id: '10580402894501892',
            username: 'Harvey',
            password: 'Pass1234'
        }
    ];

    const token = _generateToken(creds.id, res)

    router.get("/login", (req, res) => {
        res.status(200).json({
            status: "success",
            data: creds
        });

    });
}

const logout = async (req, res) => {

}

export { register, login, logout };