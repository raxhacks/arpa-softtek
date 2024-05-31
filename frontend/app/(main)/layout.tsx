export default function FileUploadLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
		<div className="z-0">
		<ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<div className="z-10">
			{children}
		</div>
	</section>
  }
