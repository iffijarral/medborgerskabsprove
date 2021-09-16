import React from 'react'

function CookiesPolicy() {
	return (
		<div className="about">
			<div>
				<h2>Cookies</h2>
				<p>
					A cookie is a small piece of data that a website asks your browser to store on your computer or mobile device. The cookie allows the website to "remember" your actions or preferences over time.
					Most browsers support cookies, but users can set their browsers to decline them and can delete them whenever they like.
				</p>
				<h2>Websites mainly use cookies to:</h2>
				<div class='cookiespolicy'>
					<ul>
						<ol>identify users</ol>
						<ol>remember users' custom preferences</ol>
						<ol>help users complete tasks without having to re‑enter information when browsing from one page to another or when visiting the site later.</ol>
					</ul>
					<p>Cookies can also be used for online behavioural target advertising and to show adverts relevant to something that the user searched for in the past.</p>
				</div>

				<h2>Different types of cookies</h2>
				<p>
					A cookie can be classified by its lifespan and the domain to which it belongs. By lifespan, a cookie is either a:
					<div class='cookiespolicy'>
						<ul>
							<ol><b>Session cookie: </b>which is erased when the user closes the browser</ol>
							<ol><b>Persistent cookie: </b>which remains on the user's computer/device for a pre-defined period of time.</ol>
						</ul>
					</div>

				</p>
				<h2>How do we use cookies?</h2>
				<p>
					We use only session cookies, which are used as per session like login info. We don't save cookies on user's computer/device.
				</p>
			</div>
		</div>
	)
}

export default CookiesPolicy
