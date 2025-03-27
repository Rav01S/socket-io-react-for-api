import css from "./index.module.css";
import {Link} from "react-router-dom";

export default function Header() {
  const isAuthed = !!localStorage.getItem('token');

  return (
    <header>
      <div className={css.container}>
        <div className={css.header__logo}>Logo</div>
        <nav className={css.header__nav}>
          <ul className={css.header__nav_list}>
            {
              isAuthed ? <>
                <li className={css.header__nav_item}>
                  <Link to={"/posts"} className={css.header__nav_link}>Посты</Link>
                </li>
              </> : <>
                <li className={css.header__nav_item}>
                  <Link to={"/login"} className={css.header__nav_link}>Вход</Link>
                </li>
                <li className={css.header__nav_item}>
                  <Link to={"/register"} className={css.header__nav_link}>Регистрация</Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  );
}