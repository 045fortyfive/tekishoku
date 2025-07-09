"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  targetCalories: number;
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    targetCalories: 2000,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    router.push("/");
  };

  return (
    <div
      className="min-h-screen bg-slate-100 p-4 relative overflow-hidden"
      data-oid="d2xkep5"
    >
      {/* Background Elements */}
      <div
        className="fixed inset-0 bg-blue-400/20 blur-3xl rounded-full w-96 h-96 -top-48 -left-48"
        data-oid="3_ht8fd"
      ></div>
      <div
        className="fixed inset-0 bg-purple-400/20 blur-3xl rounded-full w-80 h-80 top-1/3 -right-40"
        data-oid="8-klv9e"
      ></div>
      <div
        className="fixed inset-0 bg-green-400/20 blur-3xl rounded-full w-72 h-72 bottom-0 left-1/3"
        data-oid="58zclsq"
      ></div>

      <div
        className="max-w-md mx-auto space-y-6 relative z-10"
        data-oid="p-1urz:"
      >
        {/* Header */}
        <div className="flex items-center gap-4" data-oid="wqbkvdk">
          <Link href="/" data-oid="2pd3zo_">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 rounded-2xl"
              data-oid="5.7cvz1"
            >
              <ArrowLeft className="h-5 w-5" data-oid="ihi.zui" />
            </Button>
          </Link>
          <div className="flex items-center gap-3" data-oid="un2d0sp">
            <div className="text-2xl" data-oid="spcey4f">
              🍱
            </div>
            <div data-oid="zhr.zd.">
              <h1
                className="text-2xl font-bold text-slate-800"
                data-oid="0ve_e64"
              >
                Bento Settings
              </h1>
              <p className="text-sm text-slate-600" data-oid="kgt1y-8">
                Customize your experience
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div
          className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg"
          data-oid="ouwcnqv"
        >
          <div className="p-4 pb-3 border-b border-white/30" data-oid="..u28t.">
            <h3
              className="text-lg font-semibold text-slate-800"
              data-oid="5w0.pf9"
            >
              Profile
            </h3>
          </div>
          <div className="p-6 space-y-4" data-oid="qbi99c-">
            <div className="space-y-2" data-oid="h4kr9r4">
              <Label
                htmlFor="name"
                className="text-slate-700"
                data-oid="qf1zal5"
              >
                Name (optional)
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Your name"
                className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl focus:border-purple-300/50"
                data-oid="ky9b8vv"
              />
            </div>

            <div className="space-y-2" data-oid="xek-4g8">
              <Label
                htmlFor="target"
                className="text-slate-700"
                data-oid="vz87-_s"
              >
                Daily Calorie Goal
              </Label>
              <Input
                id="target"
                type="number"
                value={profile.targetCalories || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    targetCalories: Number.parseInt(e.target.value) || 2000,
                  })
                }
                placeholder="2000"
                className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl focus:border-purple-300/50"
                data-oid="sb3jkue"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-purple-500/80 backdrop-blur-xl border border-purple-400/30 hover:bg-purple-500/90 text-white shadow-lg rounded-2xl"
          size="lg"
          data-oid="5h8pdmg"
        >
          <Save className="h-5 w-5 mr-2" data-oid="jggu2uy" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
