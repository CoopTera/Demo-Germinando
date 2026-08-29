// Control de estado de animación de sesión
// Se reinicia al recargar la página (F5, ingreso directo, nueva pestaña),
// pero persiste mientras el usuario navega entre las pestañas del dashboard.

let dashboardAnimated = false;

export function isDashboardFirstLoad() {
  return !dashboardAnimated;
}

export function markDashboardAsAnimated() {
  dashboardAnimated = true;
}

export function resetDashboardAnimation() {
  dashboardAnimated = false;
}
