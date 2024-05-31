export default function FileUploadLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        {children}
      <div className="area">
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
      </section>
  }
