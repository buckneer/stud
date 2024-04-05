import {ReactNode} from "react";


export interface ITD {
	children: ReactNode;
}

function TD({children} : ITD) {
	return (
		<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
			{children}
		</td>
	);
}

export default TD
