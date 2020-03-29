import routes from "../routes";

export const findNextRoute = route => routes.find(r => r.route === route);
