const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função de Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verifique se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    // 2. Compare a senha enviada com a senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida!' });
    }

    // 3. Gere um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'seuSegredoSuperSeguro', // Substitua por uma variável de ambiente no futuro
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    // 4. Retorne o token ao cliente
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor!' });
  }
};
