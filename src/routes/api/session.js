import { Router } from "express";
import User from '../../models/user.js'

const router = Router ()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new User({ first_name, last_name, email, age, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user;
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            user = {
                role: req.session.user.role,
                first_name: 'Coder',
                last_name: 'House',
                email: email,
                age: req.session.user.age
            };
        } else {
            user = await User.findOne({ email });
            if (!user) return res.status(404).send('Usuario no encontrado');
            if (user.password !== password) return res.status(401).send('Contraseña incorrecta');
            user.role = 'user';
        }

        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role || 'user', 
        };

        if (req.session.user.role === 'admin') {
            res.redirect('/profile');
        } else {
            res.redirect('/products');
        }

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;