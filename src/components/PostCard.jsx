import React from "react";
import { Link } from "react-router-dom";
import conf from "../conf/conf"; // Make sure to import your configuration

function PostCard({ $id, featuredImage, title }) {
	// If featuredImage is provided, use the direct file URL, otherwise fallback to a default image.
	const imageUrl = featuredImage
		? `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${featuredImage}/view?project=${conf.appwriteProjectId}`
		: "/default-fallback-image.png"; // Fallback image

	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					<img
						src={imageUrl}
						alt={`Featured image for ${title}`} // Improved alt text for accessibility
						className="rounded-xl"
					/>
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default PostCard;
