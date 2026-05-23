<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Amelia Admin',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Clear existing entries to prevent duplication
        Project::truncate();
        Certificate::truncate();
        Experience::truncate();
        Skill::truncate();

        // 3. Seed Projects
        $projects = [
            [
                'title' => 'E‑Commerce Platform',
                'description' => 'Full‑featured online store with payment integration, real‑time inventory, and an admin dashboard for managing products and orders.',
                'stack' => ['React', 'Laravel', 'MySQL', 'Stripe'],
                'github' => 'https://github.com',
                'demo' => 'https://example.com',
                'color' => 'emerald',
                'order' => 1,
            ],
            [
                'title' => 'Project Management App',
                'description' => 'Kanban‑style task tracker with drag‑and‑drop, team collaboration, real‑time updates, and deadline notifications.',
                'stack' => ['Next.js', 'Node.js', 'PostgreSQL', 'Socket.io'],
                'github' => 'https://github.com',
                'demo' => 'https://example.com',
                'color' => 'indigo',
                'order' => 2,
            ],
            [
                'title' => 'AI Content Generator',
                'description' => 'SaaS tool that uses AI to generate marketing copy, blog posts, and social media content with customizable tone and style.',
                'stack' => ['React', 'Python', 'OpenAI', 'TailwindCSS'],
                'github' => 'https://github.com',
                'demo' => 'https://example.com',
                'color' => 'sky',
                'order' => 3,
            ],
            [
                'title' => 'Portfolio Website',
                'description' => 'Modern personal portfolio with dark theme, smooth animations, glassmorphism effects, and a fully responsive design.',
                'stack' => ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
                'github' => 'https://github.com',
                'demo' => 'https://example.com',
                'color' => 'rose',
                'order' => 4,
            ],
            [
                'title' => 'Real‑Time Chat App',
                'description' => 'Instant messaging application with group chats, file sharing, read receipts, and end‑to‑end message encryption.',
                'stack' => ['React', 'Firebase', 'WebRTC', 'TailwindCSS'],
                'github' => 'https://github.com',
                'demo' => 'https://example.com',
                'color' => 'amber',
                'order' => 5,
            ],
            [
                'title' => 'Analytics Dashboard',
                'description' => 'Data visualization dashboard with interactive charts, custom filters, CSV export, and role‑based access control.',
                'stack' => ['Next.js', 'D3.js', 'Laravel', 'Redis'],
                'github' => 'https://github.com',
                'demo' => 'https://example.com',
                'color' => 'emerald',
                'order' => 6,
            ],
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }

        // 4. Seed Certificates
        $certificates = [
            [
                'title' => 'Advanced React Patterns & Performance',
                'issuer' => 'Frontend Masters',
                'date' => 'Jan 2025',
                'credential' => 'FM-REACT-2025-8842',
                'skills' => ['React', 'Performance', 'Architecture'],
                'category' => 'Frontend',
                'verify_url' => 'https://example.com/verify/fm-react-8842',
                'order' => 1,
            ],
            [
                'title' => 'System Design Fundamentals',
                'issuer' => 'Coursera',
                'date' => 'Nov 2024',
                'credential' => 'COURSERA-SD-441902',
                'skills' => ['Distributed Systems', 'APIs', 'Scalability'],
                'category' => 'Backend',
                'verify_url' => 'https://example.com/verify/coursera-sd',
                'order' => 2,
            ],
            [
                'title' => 'UX Research & Interaction Design',
                'issuer' => 'Google UX Design',
                'date' => 'Aug 2024',
                'credential' => 'GUX-IXD-7721',
                'skills' => ['UX Research', 'Prototyping', 'Accessibility'],
                'category' => 'UI/UX',
                'verify_url' => 'https://example.com/verify/gux-ixd',
                'order' => 3,
            ],
            [
                'title' => 'AWS Certified Solutions Architect',
                'issuer' => 'Amazon Web Services',
                'date' => 'Mar 2024',
                'credential' => 'AWS-SAA-C03-993104',
                'skills' => ['AWS', 'IaC', 'Networking'],
                'category' => 'DevOps',
                'verify_url' => 'https://example.com/verify/aws-saa',
                'order' => 4,
            ],
            [
                'title' => 'Kotlin Multiplatform Mobile',
                'issuer' => 'LinkedIn Learning',
                'date' => 'Jun 2025',
                'credential' => 'LI-KMM-220188',
                'skills' => ['Kotlin', 'Compose', 'Mobile'],
                'category' => 'Mobile',
                'verify_url' => 'https://example.com/verify/li-kmm',
                'order' => 5,
            ],
            [
                'title' => 'TypeScript Deep Dive',
                'issuer' => 'Udemy',
                'date' => 'Feb 2025',
                'credential' => 'UDEMY-TS-55120',
                'skills' => ['TypeScript', 'Generics', 'Tooling'],
                'category' => 'Frontend',
                'verify_url' => 'https://example.com/verify/udemy-ts',
                'order' => 6,
            ],
            [
                'title' => 'Kubernetes for Developers',
                'issuer' => 'Linux Foundation',
                'date' => 'Sep 2024',
                'credential' => 'LFD259-778821',
                'skills' => ['Kubernetes', 'Containers', 'CI/CD'],
                'category' => 'DevOps',
                'verify_url' => 'https://example.com/m/verify/lfd259',
                'order' => 7,
            ],
            [
                'title' => 'SwiftUI & iOS Interfaces',
                'issuer' => 'Apple Developer Academy',
                'date' => 'Apr 2025',
                'credential' => 'ADA-SWIFTUI-10294',
                'skills' => ['SwiftUI', 'iOS', 'Animation'],
                'category' => 'Mobile',
                'verify_url' => 'https://example.com/verify/ada-swiftui',
                'order' => 8,
            ],
            [
                'title' => 'Laravel Full-Stack Mastery',
                'issuer' => 'Laracasts',
                'date' => 'Mar 2025',
                'credential' => 'LC-FSM-2025-3310',
                'skills' => ['Laravel', 'PHP', 'Eloquent', 'Blade'],
                'category' => 'Backend',
                'verify_url' => 'https://example.com/verify/lc-fsm',
                'order' => 9,
            ],
            [
                'title' => 'Figma for Developers',
                'issuer' => 'DesignCode',
                'date' => 'Dec 2024',
                'credential' => 'DC-FIGMA-90221',
                'skills' => ['Figma', 'Design Systems', 'Handoff'],
                'category' => 'UI/UX',
                'verify_url' => 'https://example.com/verify/dc-figma',
                'order' => 10,
            ],
            [
                'title' => 'Docker & Container Orchestration',
                'issuer' => 'Udemy',
                'date' => 'Oct 2024',
                'credential' => 'UDEMY-DOCKER-77812',
                'skills' => ['Docker', 'Compose', 'Swarm'],
                'category' => 'DevOps',
                'verify_url' => 'https://example.com/verify/udemy-docker',
                'order' => 11,
            ],
            [
                'title' => 'Next.js App Router Deep Dive',
                'issuer' => 'Vercel',
                'date' => 'Jul 2025',
                'credential' => 'VERCEL-NEXT-55019',
                'skills' => ['Next.js', 'RSC', 'Server Actions'],
                'category' => 'Frontend',
                'verify_url' => 'https://example.com/verify/vercel-next',
                'order' => 12,
            ],
            [
                'title' => 'Flutter & Dart Essentials',
                'issuer' => 'Google for Developers',
                'date' => 'May 2024',
                'credential' => 'GFD-FLUTTER-44102',
                'skills' => ['Flutter', 'Dart', 'Widgets'],
                'category' => 'Mobile',
                'verify_url' => 'https://example.com/verify/gfd-flutter',
                'order' => 13,
            ],
            [
                'title' => 'PostgreSQL Advanced Queries',
                'issuer' => 'pgExercises',
                'date' => 'Feb 2024',
                'credential' => 'PGE-AQ-2024-1198',
                'skills' => ['PostgreSQL', 'CTEs', 'Window Functions'],
                'category' => 'Backend',
                'verify_url' => 'https://example.com/verify/pge-aq',
                'order' => 14,
            ],
        ];

        foreach ($certificates as $cert) {
            $cert['image_path'] = $cert['image_path'] ?? '/images/certificates/cert-' . $cert['order'] . '.jpg';
            Certificate::create($cert);
        }

        // 5. Seed Experiences
        $experiences = [
            [
                'title' => 'Staff Ahli Kementerian PSDM',
                'company' => 'Eksekutif Mahasiswa Universitas Brawijaya (EM UB)',
                'location' => 'Universitas Brawijaya',
                'duration' => '2024 – Present',
                'description' => 'Mengelola sumber daya mahasiswa tingkat universitas, koordinasi modul kepemimpinan nasional, dan eksekusi media kreatif.',
                'stack' => null,
                'prokers' => [
                    'LKMM-TL NASIONAL (Wakil Ketua Pelaksana)',
                    'Garasi Brawijaya (WaCo Creative Design Media)',
                    'PKO & Silabus (Staff Creative)',
                    'Next Brawijaya (Team Creative)',
                    'Internal PSDM 2025 (Team Creative)',
                    'Pancasila (Team Creative)',
                    'Tangan Brawijaya (PJ Fakultas Vokasi)'
                ],
                'images' => ['/images/experience/emub.jpg'],
                'current' => true,
                'order' => 1,
            ],
            [
                'title' => 'Wakil Ketua Departemen Pengembangan Keilmiahan dan Daya Kritis Mahasiswa',
                'company' => 'UAM Penalaran Vokasi',
                'location' => 'Fakultas Vokasi UB',
                'duration' => '2023 – 2024',
                'description' => 'Mengarahkan iklim ilmiah mahasiswa vokasi, mengontrol kualitas kompetisi karya tulis, dan memimpin berjalannya program kerja penalaran.',
                'stack' => null,
                'prokers' => [
                    'FOURSVIA (Wakil Ketua Pelaksana)',
                    'PKM BOOST (Steering Committee)',
                    'VOCUS (Steering Committee)'
                ],
                'images' => ['/images/experience/penalaran.jpg'],
                'current' => false,
                'order' => 2,
            ],
            [
                'title' => 'Staff Departemen PSDM',
                'company' => 'HMPSTI Vokasi UB',
                'location' => 'Malang, ID',
                'duration' => '2022 – 2023',
                'description' => 'Bertanggung jawab atas manajemen rangkaian event IT prodi, serta berkontribusi dalam menyambut mahasiswa baru.',
                'stack' => null,
                'prokers' => [
                    'Tech Bridge Academy (Wakil Ketua Pelaksana)',
                    'Tech Fair (Wakil Ketua Pelaksana)',
                    'Tech Hunt (Wakil Ketua Pelaksana)',
                    'PKKMB Prodi TI (Co Acara)'
                ],
                'images' => ['/images/experience/hmpsti.jpg'],
                'current' => false,
                'order' => 3,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }

        // 6. Seed Skills
        $skills = [
            // Frontend
            ['name' => 'React', 'slug' => 'react', 'category' => 'Frontend', 'order' => 1],
            ['name' => 'Tailwind', 'slug' => 'tailwindcss', 'category' => 'Frontend', 'order' => 2],
            ['name' => 'JavaScript', 'slug' => 'javascript', 'category' => 'Frontend', 'order' => 3],
            ['name' => 'TypeScript', 'slug' => 'typescript', 'category' => 'Frontend', 'order' => 4],
            ['name' => 'Next.js', 'slug' => 'nextdotjs', 'category' => 'Frontend', 'order' => 5],
            ['name' => 'HTML', 'slug' => 'html5', 'category' => 'Frontend', 'order' => 6],
            ['name' => 'CSS', 'slug' => 'css3', 'category' => 'Frontend', 'order' => 7],

            // Backend
            ['name' => 'Laravel', 'slug' => 'laravel', 'category' => 'Backend', 'order' => 1],
            ['name' => 'PHP', 'slug' => 'php', 'category' => 'Backend', 'order' => 2],
            ['name' => 'MySQL', 'slug' => 'mysql', 'category' => 'Backend', 'order' => 3],
            ['name' => 'Node.js', 'slug' => 'nodedotjs', 'category' => 'Backend', 'order' => 4],
            ['name' => 'PostgreSQL', 'slug' => 'postgresql', 'category' => 'Backend', 'order' => 5],
            ['name' => 'REST APIs', 'lucide_icon' => 'Webhook', 'category' => 'Backend', 'order' => 6],

            // Tools
            ['name' => 'Git', 'slug' => 'git', 'category' => 'Tools', 'order' => 1],
            ['name' => 'Docker', 'slug' => 'docker', 'category' => 'Tools', 'order' => 2],
            ['name' => 'VS Code', 'slug' => 'visualstudiocode', 'category' => 'Tools', 'order' => 3],
            ['name' => 'Linux', 'slug' => 'linux', 'category' => 'Tools', 'order' => 4],
            ['name' => 'Vite', 'slug' => 'vite', 'category' => 'Tools', 'order' => 5],
            ['name' => 'Postman', 'slug' => 'postman', 'category' => 'Tools', 'order' => 6],

            // Design
            ['name' => 'Figma', 'slug' => 'figma', 'category' => 'Design', 'order' => 1],
            ['name' => 'UI / UX', 'lucide_icon' => 'PenTool', 'category' => 'Design', 'order' => 2],
            ['name' => 'Responsive', 'lucide_icon' => 'LayoutTemplate', 'category' => 'Design', 'order' => 3],
            ['name' => 'Prototyping', 'lucide_icon' => 'Layers', 'category' => 'Design', 'order' => 4],
            ['name' => 'Typography', 'lucide_icon' => 'Type', 'category' => 'Design', 'order' => 5],
            ['name' => 'Color', 'lucide_icon' => 'Pipette', 'category' => 'Design', 'order' => 6],
        ];

        foreach ($skills as $sk) {
            Skill::create($sk);
        }
    }
}
