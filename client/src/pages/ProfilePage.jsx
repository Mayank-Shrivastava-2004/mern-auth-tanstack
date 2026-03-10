import { useNavigate } from 'react-router-dom';
import useUserProfile from '../hooks/useUserProfile.js';

const ProfilePage = () => {
    const { data, isLoading, isError } = useUserProfile();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-slate-400">Loading...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-red-400">Failed to load profile. Please log in again.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold text-white">My Profile</h1>
                    <button
                        id="logout-btn"
                        onClick={handleLogout}
                        className="text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                        {data?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white font-semibold">{data?.name}</p>
                        <p className="text-slate-400 text-sm">{data?.email}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-800 rounded-xl px-5 py-3 border border-slate-700">
                        <span className="text-slate-400 text-sm">Name</span>
                        <span className="text-white text-sm font-medium">{data?.name}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800 rounded-xl px-5 py-3 border border-slate-700">
                        <span className="text-slate-400 text-sm">Email</span>
                        <span className="text-white text-sm font-medium">{data?.email}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800 rounded-xl px-5 py-3 border border-slate-700">
                        <span className="text-slate-400 text-sm">Status</span>
                        <span className="text-emerald-400 text-sm font-medium">Verified ✓</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
