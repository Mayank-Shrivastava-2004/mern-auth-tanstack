import useUserProfile from '../hooks/useUserProfile.js';

const ProfileCard = () => {
    const { data, isLoading, isError, error } = useUserProfile();

    if (isLoading) {
        return <p>Loading profile...</p>;
    }

    if (isError) {
        return <p>Error: {error?.response?.data?.message || 'Failed to fetch profile'}</p>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
        </div>
    );
};

export default ProfileCard;
