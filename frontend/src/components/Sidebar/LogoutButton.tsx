import { LogOut } from "lucide-react";
import useLogout from "../../Hooks/useLogout";

const LogoutButton = () => {
	const { logout} = useLogout();

	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
export default LogoutButton;












// import { BiLogOut } from 'react-icons/bi'

// const LogoutButton = () => {
//   return (
//     <div className='mt-auto'>
//         <BiLogOut className='w-6 h-6 text-white cursor-pointer '/>
//     </div>
//   )
// }

// export default LogoutButton