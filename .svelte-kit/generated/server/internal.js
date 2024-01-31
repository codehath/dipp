
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	track_server_fetches: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t\t<style>\n\t\t\t* {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tpadding: 0;\n\t\t\t\tmargin: 0;\n\t\t\t\ttransition-duration: 200ms;\n\t\t\t}\n\t\t\tbody {\n\t\t\t\tbackground-image: url('/images/background-gradient.png');\n\t\t\t\tbackground-size: cover;\n    \t\tbackground-position: center;\n\t\t\t}\n\t\t\thtml {\n\t\t\t\tfont-family: Helvetica Neue;\n\t\t\t}\n\t\t  a {\n\t\t\t\ttext-decoration: none;\n\t\t\t\tcolor: black;\n\t\t\t}\n\t\t\tbutton {\n\t\t\t\tborder: none;\n\t\t\t\tcursor: pointer;\n\t\t\t\tbackground-color: transparent;\n\t\t\t}\n\t\t\tbutton:disabled {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\tdiv {\n\t\t\t\tdisplay: flex;\n\t\t\t\tborder: hotpink 1px solid;\n\t\t\t}\n\t\t\tform {\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t}\n\t\t\t.circular-button {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 10px;\n\t\t\t\twidth: 40px;\n\t\t\t\tz-index: 1000;\n\t\t\t}\n\t\t\t.circular-button img {\n\t\t\t\tobject-fit:cover;\n\t\t\t\twidth: 80px;\n\t\t\t}\n\t\t\t.back {\n\t\t\t\tleft: 10px;\n\t\t\t}\n\t\t\t.home {\n\t\t\t\tright: 50px;\n\t\t\t}\n\t\t\t.pop-up {\n\t\t\t\tposition: relative;\n\t\t\t\twidth: 1000px;\n\t\t\t\tmax-width: 100%;\n\t\t\t\tmin-height: 70vh;\n\t\t\t\tborder-radius: 10px;\n\t\t\t\tpadding: 100px 5vw 50px 5vw;\n\t\t\t}\n\t\t\t.pop-up-content {\n\t\t\t\twidth: 100%;\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\tjustify-content: center;\n\t\t\t\tborder:#168ACE 1px solid;\n\t\t\t}\n\t\t\t.center {\n\t\t\t\talign-items: center;\n\t\t\t}\n\t\t\t.left {\n\t\t\t\talign-items: left;\n\t\t\t}\n\t\t\t.white {\n\t\t\t\tbackground-color: white;\n\t\t\t}\n\t\t\t.light {\n\t\t\t\tbackground-color: #5DB3E5;\n\t\t\t}\n\t\t\t.medium {\n\t\t\t\tbackground-color: #639FC9;\n\t\t\t}\n\t\t\t.dark {\n\t\t\t\tbackground-color: #168ACE;\n\t\t\t}\n\t\t\t.pill {\n\t\t\t\twidth: 113px;\n\t\t\t\theight: 48.11px;\n\t\t\t\tflex-direction: column;\n\t\t\t\tjustify-content: center;\n\t\t\t\talign-items: center;\n\t\t\t\tbackground: white;\n\t\t\t\tborder-radius: 38px;\n\t\t\t\tborder: 2px #168ACE solid;\n\t\t\t\tfont-weight: 500;\n\t\t\t\tword-wrap: break-word;\n\t\t\t}\n\t\t\t.form-button {\n\t\t\t\tcursor: pointer;\n\t\t\t\tborder-radius: 20px;\n\t\t\t\tborder: 1px solid #029CF6;\n\t\t\t\twidth: 101px;\n\t\t\t\theight: 39px;\n\t\t\t\tbackground: #FFF;\n\t\t\t}\n\t\t\t.form-button input:hover{\n\t\t\t\topacity: 0.7;\n\t\t\t}\n\t\t</style>\n\t\t<!-- Load d3.js -->\n\t\t<script src=\"https://d3js.org/d3.v4.js\"></script>\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\n\t</body>\n</html>\n",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "12abpuh"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_private_env, set_public_env };
