<div class="bouncer">
	<div aria-hidden="true"></div>
	<div aria-hidden="true"></div>
	<div aria-hidden="true"></div>
	<div aria-hidden="true"></div>
</div>

<style>
	@keyframes bounce {
		from { transform: translateY(0); }
		to { transform: translateY(-300%); }
	}
	
	.bouncer {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100px;
		height: 100px;
		margin: 1rem auto;
	}
	
	.bouncer div {
		width: 20px;
		height: 20px;
		background: #0077ff;
		border-radius: 50%;
		animation: bounce 500ms cubic-bezier(0.19, 0.57, 0.3, 0.98) infinite alternate;
	}
	
	.bouncer div:nth-child(2) {
		opacity: 0.8;
		animation-delay: 100ms;
	}
	
	.bouncer div:nth-child(3) {
		opacity: 0.6;
		animation-delay: 200ms;
	}
	
	.bouncer div:nth-child(4) {
		opacity: 0.4;
		animation-delay: 300ms;
	}
</style>