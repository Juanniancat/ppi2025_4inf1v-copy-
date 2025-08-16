import { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (email && senha) {
      alert(`Bem-vindo, ${email}!`);
      navigate("/");
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem conta?
      </p>
        <Link to="/cadastrar" className={styles.Link}>
          <button className={styles.cadastrarButton}>Cadastrar</button>
        </Link>
    </div>
  );
}
