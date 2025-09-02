export function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("rola");
    window.location.href="/login";
}