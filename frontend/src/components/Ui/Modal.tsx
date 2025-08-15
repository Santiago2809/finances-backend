import ModalComponent from "react-modal";

ModalComponent.setAppElement("#root"); // Set the app element for accessibility
export function Modal({ children, isOpen, onRequestClose }: { children: React.ReactNode; isOpen: boolean; onRequestClose: () => void }) {
	return (
		<ModalComponent
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="p-4 bg-zinc-800 rounded-lg"
			overlayClassName="fixed flex justify-center items-center inset-0 bg-[rgba(24,24,24,0.7)]"
		>
			{children}
		</ModalComponent>
	);
}
