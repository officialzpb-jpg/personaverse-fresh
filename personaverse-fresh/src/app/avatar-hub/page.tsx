import UnityAvatarHub from "@/components/avatar/UnityAvatarHub";

export default function AvatarHubPage() {
  return (
    <div className="min-h-screen pt-16 bg-black">
      <UnityAvatarHub avatarUrl="/avatars/meshy-avatar-v2.glb" />
    </div>
  );
}
