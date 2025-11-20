import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { Adm } from "./Adm";

export function User() {
  const { session, handleSignOut } = useContext(SessionContext);

  if (!session) {
    return (
        <div style={{ marginTop: "15rem", textAlign: "center", fontSize: "2rem" }}>
            <p>Você não está logado.</p>
        </div>
    );
  }

  const isAdmin = session.user.user_metadata.admin === true;

  return (
    <div style={{ marginTop: "15rem", padding: "2rem 5rem", fontSize: "1.5rem" }}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem"}}>
        <h1>Perfil do Usuário</h1>
        <button 
            onClick={handleSignOut} 
            style={{padding: "1rem 2rem", fontSize: "1.5rem", cursor:"pointer", background:"#dc3545", color:"white", border:"none", borderRadius:"8px"}}
        >
            Sair (Log Out)
        </button>
      </div>
      
      <div style={{background: "#f4f4f4", padding: "2rem", borderRadius: "10px", marginBottom: "2rem"}}>
          <p><strong>Email:</strong> {session.user.email}</p>
          <p><strong>Username:</strong> {session.user.user_metadata.username}</p>
          <p><strong>Status:</strong> {isAdmin ? "Administrador ⭐" : "Cliente"}</p>
      </div>

      {isAdmin ? (
        <Adm />
      ) : (
        <div style={{textAlign: "center", padding: "2rem"}}>
          
        </div>
      )}
    </div>
  );
}








/*import { useContext } from "react";
import styles from "./User.module.css";
import { CartContext } from "../context/CartContext";

export function User() {
  const { session, handleSignOut } = useContext(CartContext);
  return (
    <div>
      {session ? (
        <div className={styles.container}>
          {session.user.user_metadata.admin ? (
            <h1>Admin Account</h1>
          ) : (
            <h1>User Account</h1>
          )}
          <div className={styles.userInfo}>
            <p>
              <strong>Username: </strong>
              {session.user.user_metadata.username}
            </p>
            <p>
              <strong>Email: </strong>
              {session.user.email}
            </p>
            <p>
              <strong>ID: </strong>
              {session.user.id}
            </p>
          </div>
          <button className={styles.button} onClick={handleSignOut}>
            SIGN OUT
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>User not signed in!</h1>
        </div>
      )}
    </div>
  );
}*/