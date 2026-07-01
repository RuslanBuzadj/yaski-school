import { Award, BookOpen, GraduationCap } from "lucide-react";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { StaffMember } from "../model/types";

type Props = {
  member: StaffMember;
};

const facts: {
  key: keyof StaffMember;
  icon: typeof Award;
  label: string;
}[] = [
  { key: "category", icon: Award, label: "Категорія" },
  { key: "education", icon: GraduationCap, label: "Освіта" },
  { key: "experience", icon: BookOpen, label: "Досвід" },
];

export function StaffProfile({ member }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="relative w-full max-w-xs mx-auto lg:mx-0 aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
        <ImagePlaceholder src={member.image} alt={member.name} fill />
      </div>

      <div className="lg:col-span-2 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{member.name}</h1>
          <p className="mt-1.5 text-base text-muted-foreground">{member.role}</p>
        </div>

        {member.subjects && member.subjects.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {member.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-yellow-300/60 dark:bg-yellow-400/20 px-3 py-1 text-xs font-medium text-foreground"
              >
                {subject}
              </span>
            ))}
          </div>
        )}

        <dl className="flex flex-col gap-4 border-y border-border py-6">
          {facts
            .filter(({ key }) => member[key])
            .map(({ key, icon: Icon, label }) => (
              <div key={key} className="flex items-start gap-3">
                <Icon className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5" />
                <div>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-sm text-foreground">{member[key] as string}</dd>
                </div>
              </div>
            ))}
        </dl>

        {member.bio && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Про вчителя</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
