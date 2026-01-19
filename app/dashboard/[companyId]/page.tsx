import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { whopsdk } from "@/lib/whop-sdk";

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	const { companyId } = await params;
	
	try {
		// Ensure the user is logged in on whop.
		const { userId } = await whopsdk.verifyUserToken(await headers());

		// Fetch the necessary data we want from whop.
		const [company, user, access] = await Promise.all([
			whopsdk.companies.retrieve(companyId),
			whopsdk.users.retrieve(userId),
			whopsdk.users.checkAccess(companyId, { id: userId }),
		]);

		// Log access decision for debugging
		console.log(`[DASHBOARD] User: ${userId} | AccessLevel: ${access.access_level}`);

		// Determine role and redirect accordingly
		if (access.access_level === 'admin') {
			console.log('[DASHBOARD] Redirecting to /admin');
			redirect('/admin');
		} else if (access.has_access) {
			console.log('[DASHBOARD] Redirecting to /circle');
			redirect('/circle');
		} else {
			console.log('[DASHBOARD] Redirecting to /stems (Access Denied/Visitor)');
			redirect('/stems');
		}
	} catch (error) {
		// If authentication fails, redirect to stems
		redirect('/stems');
	}
}
