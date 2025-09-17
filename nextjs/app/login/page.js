import Logintextbox from "@/components/Logintextbox";

export default function Login() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <h1 style={{ fontFamily: "Kapakana", color: "#2E4265" }}>
        L'heure bleue
      </h1>
      <Logintextbox />
    </main>
  );
}
