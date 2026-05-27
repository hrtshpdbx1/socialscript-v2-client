// src/components/AdminNav.jsx
// 
import { NavLink } from "react-router"
import { roleAtom } from "../../atoms/auth.atom";
import { useAtomValue } from "jotai";


export const AdminNav = () => {

    const role = useAtomValue(roleAtom);

    return (
        <div className="flex flex-col justify-between items-center  py-4 px-8 bg-primary w-1/5 items-stretch">

            {/* Welcome Admin */}
            <nav>
                <ul className="flex flex-col items-center gap-4 text-white">
                    <li>
                        <NavLink to="/admin" end>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/scenarios">
                            Scénarios
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to="/admin/themes">
                            Thèmes
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/admin/reports">
                            Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/resources">
                            Ressources
                        </NavLink>
                    </li>
                        {role === 'admin' && (
                            <li>
                                <NavLink to="/admin/users">Users</NavLink>
                            </li>
                        )}
                </ul>
            </nav>
        </div>
    )
}