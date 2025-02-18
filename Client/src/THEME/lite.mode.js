// light theme function
export const liteModeTheme = () => {
  document.querySelector("body").setAttribute("DATA-THEME", "LITE");
  localStorage.setItem("THEME", "LITE");
};
