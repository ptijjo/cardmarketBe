import { App } from "./app";
import { ArticleRoute } from "./routes/article.route";
import { UserRoute } from "./routes/user.route";


new App([new UserRoute(), new ArticleRoute()]);