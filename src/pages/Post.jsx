import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import fileService from "../appwrite/file";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import conf from "../conf/conf";

export default function Post() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);

	// Check if the current user is the author of the post
	const isAuthor = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
				} else {
					navigate("/"); // Redirect to home if post is not found
				}
			});
		} else {
			navigate("/"); // Redirect to home if no slug
		}
	}, [slug, navigate]);

	const deletePost = () => {
		appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				// Delete the featured image from storage
				fileService.fileDelete(post.featuredImage);
				navigate("/"); // Redirect to home after deleting
			}
		});
	};

	// Construct image URL or use fallback if no image is provided
	const imageUrl =
		post && post.featuredImage
			? `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${post.featuredImage}/view?project=${conf.appwriteProjectId}`
			: "/default-fallback-image.png"; // Fallback image if no featured image

	return post ? (
		<div className="py-8">
			<Container>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					{/* Use constructed image URL or fallback */}
					<img
						src={imageUrl}
						alt={post.title} // Improved alt text for accessibility
						className="rounded-xl"
					/>

					{isAuthor && (
						<div className="absolute right-6 top-6">
							{/* Edit and Delete buttons for authors */}
							<Link to={`/edit-post/${post.$id}`}>
								<Button bgColor="bg-green-500" className="mr-3">
									Edit
								</Button>
							</Link>
							<Button bgColor="bg-red-500" onClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className="w-full mb-6">
					<h1 className="text-2xl font-bold">{post.title}</h1>
				</div>
				{/* Render the content of the post */}
				<div className="browser-css">{parse(post.content)}</div>
			</Container>
		</div>
	) : (
		<div className="h-screen w-full bg-[#1f1d1d] text-center flex justify-center relative">
			<span className="absolute loader top-5"></span>
		</div> // Show loading text while fetching the post
	);
}
