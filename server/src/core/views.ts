import { join } from "path";
import nunjucks from "nunjucks";
import type { Context } from "hono";

const viewsDir = join(process.cwd(), "views");
const cache = new Map<string, string>();

nunjucks.configure(viewsDir, {
  noCache: false
});

export async function viewsMiddleware(ctx: Context) {
  const html = getHTML(ctx.req.url);
  return ctx.html(html);
}

function getHTML(url: string): string {
  if (cache.has(url))
    return cache.get(url) as string;

  const { pathname } = new URL(url);
  const decoded = decodeURIComponent(pathname);
  const html = renderHTML(decoded === "/" ? "index" : decoded);
  cache.set(url, html);
  return html;
}

function renderHTML(pathname: string): string {
  try {
    const templatePath = join(viewsDir, pathname + ".html");
    return nunjucks.render(templatePath);
  } catch (error) {
    const templatePath = join(viewsDir, "404.html");
    return nunjucks.render(templatePath);
  }
}