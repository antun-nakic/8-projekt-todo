import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { change } from "../store/form/formSlice";
import { register } from "../store/user/userSlice";

const Register = () => {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const errorFeedback = useRef(null);

  const navigate = useNavigate();
  const { form, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.username !== "") {
      navigate(`/dashboard`);
    } else if (user.error !== "") {
      errorFeedback.current.innerHTML = user.error;
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username.length >= 3 && form.password === form.passwordRepeat) {
      dispatch(
        register({
          url: "https://algebra-todoapp.brehak.com/api/auth/register",
          payload: { username: form.username, password: form.password },
        })
      );
    } else {
      errorFeedback.current.innerHTML =
        "Dogodila se pogreška. Provjerite je li se šifre podudaraju, te provjerite da ste odabrali username sa minimalno 3 slova.";
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="gradient-blu blue-background ">
        <img
          src="../assets/TodoIlustracija.png"
          alt="Ilustracija za registraciju"
          className="max-h-screen"
        />
      </div>
      <div className="gradient-white white-background">
        {/* form */}
        <div className="form-container ">
          <div className="form-background">
            <h1 className="form-text">Novi korisnik</h1>
            <form onSubmit={handleSubmit}>
              <input
                ref={usernameInput}
                type="text"
                className="form-input"
                placeholder="Korisničko ime"
                value={form.username}
                onChange={() =>
                  dispatch(
                    change({
                      stateName: "username",
                      value: usernameInput.current.value,
                    })
                  )
                }
                required
              />
              <input
                ref={passwordInput}
                type="password"
                className="form-input"
                value={form.password}
                onChange={() =>
                  dispatch(
                    change({
                      stateName: "password",
                      value: passwordInput.current.value,
                    })
                  )
                }
                placeholder="Lozinka"
                required
              />
              <input
                ref={confirmPasswordInput}
                type="password"
                className="block bg-gray-100 focus:bg-white w-full p-3 rounded mb-4"
                value={form.passwordRepeat}
                onChange={() =>
                  dispatch(
                    change({
                      stateName: "passwordRepeat",
                      value: confirmPasswordInput.current.value,
                    })
                  )
                }
                placeholder="Potvrdite lozinku"
                required
              />
              <button type="submit" className="login-btn">
                Registracija
                <FaSignInAlt className="ml-2" />
              </button>
            </form>
            <div className="text-red-500 mb-4 ml-1" ref={errorFeedback}></div>
            <div className="text-center text-sm text-gray-400 mt-4">
              Registracijom prihvaćate uvjete određene našom Politikom o
              privatnosti.
            </div>
          </div>
          <div className="text-gray-900 mt-6">
            Imate registiran profil?
            <a className="text-highlight" href="../login/">
              Logirajte se
            </a>
          </div>
        </div>

        {/* form end */}
      </div>
    </div>
  );
};

export default Register;
