import movies from './movies.txt';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const title = (url.searchParams.get("title") || "").toLowerCase();
    const year = url.searchParams.get("year") || "";
    const titleSlug = title.replace(/\s+/g,"-");
    const lines = movies.split("\n");

    for (const line of lines) {
      const pageURL = line.trim();
      if (!pageURL) continue;
      const match = pageURL.match(/\/c(\d+)\/(.+)\.html/);
      if (!match) continue;

      const id = match[1];
      const slug = match[2].toLowerCase();

      if (slug.includes(year) && slug.includes(titleSlug)) {
        const download = `https://www.mp4moviez.football/dl.php?id=${id}&q=720&title=${slug}`;
        return new Response(JSON.stringify({found:true,download}),{
          headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
        });
      }
    }

    return new Response(JSON.stringify({found:false}),{
      headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
    });
  }
}
