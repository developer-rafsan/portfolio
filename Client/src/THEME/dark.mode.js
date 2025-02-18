// dark theme function
export const darkModeTheme = () => {
  document.querySelector("body").setAttribute("DATA-THEME", "DARK");
  localStorage.setItem("THEME", "DARK");
};
