"use client"

import { useState } from "react"
import { Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResumeTemplatePreviewProps {
  template: string
  content: any
}

export default function ResumeTemplatePreview({ template, content }: ResumeTemplatePreviewProps) {
  const [scale, setScale] = useState(0.6)

  // Format name
  const fullName =
    `${content.personalInfo.firstName || ""} ${content.personalInfo.lastName || ""}`.trim() || "Your Name"

  // Format contact info
  const contactInfo = [
    content.personalInfo.email,
    content.personalInfo.phone,
    content.personalInfo.location,
    content.personalInfo.website,
  ]
    .filter(Boolean)
    .join(" | ")

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-2 px-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => setScale((s) => Math.max(0.3, s - 0.1))}
          >
            -
          </Button>
          <span className="text-xs">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setScale((s) => Math.min(1, s + 0.1))}>
            +
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full overflow-hidden bg-white" style={{ height: "600px" }}>
        <div
          className="w-[8.5in] mx-auto origin-top transition-transform bg-white shadow-md"
          style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
        >
          {template === "modern" && (
            <div className="p-8 min-h-[11in]">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>
                {contactInfo && <p className="text-sm text-gray-600 mt-1">{contactInfo}</p>}
              </div>

              {/* Summary */}
              {content.personalInfo.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Professional Summary</h2>
                  <p className="text-sm text-gray-700">{content.personalInfo.summary}</p>
                </div>
              )}

              {/* Experience */}
              {content.experience && content.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Experience</h2>
                  {content.experience.map((exp: any, index: number) => (
                    <div key={exp.id || index} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-md font-medium text-gray-800">{exp.title || "Job Title"}</h3>
                          <p className="text-sm text-gray-700">{exp.company || "Company"}</p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {exp.startDate || "Start Date"} - {exp.current ? "Present" : exp.endDate || "End Date"}
                        </p>
                      </div>
                      {exp.location && <p className="text-sm text-gray-600 italic">{exp.location}</p>}
                      {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}

                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                          {exp.achievements.map((achievement: string, i: number) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {content.education && content.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Education</h2>
                  {content.education.map((edu: any, index: number) => (
                    <div key={edu.id || index} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-md font-medium text-gray-800">{edu.degree || "Degree"}</h3>
                          <p className="text-sm text-gray-700">{edu.institution || "Institution"}</p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                        </p>
                      </div>
                      {edu.location && <p className="text-sm text-gray-600 italic">{edu.location}</p>}
                      {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {content.skills && (content.skills.technical.length > 0 || content.skills.soft.length > 0) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Skills</h2>

                  {content.skills.technical.length > 0 && (
                    <div className="mb-2">
                      <h3 className="text-sm font-medium text-gray-800">Technical Skills</h3>
                      <p className="text-sm text-gray-700">{content.skills.technical.join(", ")}</p>
                    </div>
                  )}

                  {content.skills.soft.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Soft Skills</h3>
                      <p className="text-sm text-gray-700">{content.skills.soft.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Projects */}
              {content.projects && content.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Projects</h2>
                  {content.projects.map((project: any, index: number) => (
                    <div key={project.id || index} className="mb-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-md font-medium text-gray-800">{project.title || "Project Title"}</h3>
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-sm text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
                      {project.technologies && project.technologies.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {content.certifications && content.certifications.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Certifications</h2>
                  {content.certifications.map((cert: any, index: number) => (
                    <div key={cert.id || index} className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-md font-medium text-gray-800">{cert.name || "Certification Name"}</h3>
                          <p className="text-sm text-gray-700">{cert.issuer || "Issuing Organization"}</p>
                        </div>
                        {cert.date && <p className="text-sm text-gray-600">{cert.date}</p>}
                      </div>
                      {cert.url && (
                        <a
                          href={cert.url}
                          className="text-sm text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Languages */}
              {content.languages && content.languages.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Languages</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {content.languages.map((lang: any, index: number) => (
                      <div key={lang.id || index}>
                        <span className="text-sm font-medium text-gray-800">{lang.name || "Language"}: </span>
                        <span className="text-sm text-gray-700">{lang.proficiency || "Proficiency"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References */}
              {content.references && content.references.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">References</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.references.map((ref: any, index: number) => (
                      <div key={ref.id || index} className="text-sm">
                        <p className="font-medium text-gray-800">{ref.name || "Reference Name"}</p>
                        <p>
                          {ref.position || "Position"}, {ref.company || "Company"}
                        </p>
                        {ref.email && <p className="text-gray-700">Email: {ref.email}</p>}
                        {ref.phone && <p className="text-gray-700">Phone: {ref.phone}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {template === "professional" && (
            <div className="min-h-[11in] flex">
              {/* Left sidebar */}
              <div className="w-1/3 bg-gray-100 p-6">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-800">{fullName}</h1>
                  {content.personalInfo.email && <p className="text-sm mt-1">{content.personalInfo.email}</p>}
                  {content.personalInfo.phone && <p className="text-sm">{content.personalInfo.phone}</p>}
                  {content.personalInfo.location && <p className="text-sm">{content.personalInfo.location}</p>}
                  {content.personalInfo.website && (
                    <p className="text-sm text-blue-600 hover:underline">
                      <a href={content.personalInfo.website} target="_blank" rel="noopener noreferrer">
                        {content.personalInfo.website.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  )}
                </div>

                {/* Skills */}
                {content.skills && (content.skills.technical.length > 0 || content.skills.soft.length > 0) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>

                    {content.skills.technical.length > 0 && (
                      <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-800">Technical</h3>
                        <ul className="list-disc list-inside text-sm">
                          {content.skills.technical.map((skill: string, i: number) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {content.skills.soft.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">Soft Skills</h3>
                        <ul className="list-disc list-inside text-sm">
                          {content.skills.soft.map((skill: string, i: number) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Languages */}
                {content.languages && content.languages.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                      Languages
                    </h2>
                    <ul className="list-disc list-inside text-sm">
                      {content.languages.map((lang: any, index: number) => (
                        <li key={lang.id || index}>
                          {lang.name || "Language"}: {lang.proficiency || "Proficiency"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {content.certifications && content.certifications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                      Certifications
                    </h2>
                    {content.certifications.map((cert: any, index: number) => (
                      <div key={cert.id || index} className="mb-2 text-sm">
                        <p className="font-medium">{cert.name || "Certification Name"}</p>
                        <p>
                          {cert.issuer || "Issuing Organization"}, {cert.date || "Date"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Main content */}
              <div className="w-2/3 p-6">
                {/* Summary */}
                {content.personalInfo.summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Professional Summary</h2>
                    <p className="text-sm">{content.personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {content.experience && content.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Experience</h2>
                    {content.experience.map((exp: any, index: number) => (
                      <div key={exp.id || index} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-md font-medium text-gray-800">{exp.title || "Job Title"}</h3>
                            <p className="text-sm">
                              {exp.company || "Company"}
                              {exp.location ? `, ${exp.location}` : ""}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {exp.startDate || "Start Date"} - {exp.current ? "Present" : exp.endDate || "End Date"}
                          </p>
                        </div>
                        {exp.description && <p className="text-sm mt-1">{exp.description}</p>}

                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="list-disc list-inside text-sm mt-1">
                            {exp.achievements.map((achievement: string, i: number) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {content.education && content.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Education</h2>
                    {content.education.map((edu: any, index: number) => (
                      <div key={edu.id || index} className="mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-md font-medium text-gray-800">{edu.degree || "Degree"}</h3>
                            <p className="text-sm">
                              {edu.institution || "Institution"}
                              {edu.location ? `, ${edu.location}` : ""}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                          </p>
                        </div>
                        {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {content.projects && content.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Projects</h2>
                    {content.projects.map((project: any, index: number) => (
                      <div key={project.id || index} className="mb-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-md font-medium text-gray-800">{project.title || "Project Title"}</h3>
                          {project.link && (
                            <a
                              href={project.link}
                              className="text-sm text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                        {project.description && <p className="text-sm mt-1">{project.description}</p>}
                        {project.technologies && project.technologies.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* References */}
                {content.references && content.references.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">References</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.references.map((ref: any, index: number) => (
                        <div key={ref.id || index} className="text-sm">
                          <p className="font-medium">{ref.name || "Reference Name"}</p>
                          <p>
                            {ref.position || "Position"}, {ref.company || "Company"}
                          </p>
                          {ref.email && <p>Email: {ref.email}</p>}
                          {ref.phone && <p>Phone: {ref.phone}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add more templates here (creative, minimal, executive) */}
          {template !== "modern" && template !== "professional" && (
            <div className="flex items-center justify-center h-[11in]">
              <div className="text-center p-8">
                <h2 className="text-xl font-bold mb-2 capitalize">{template} Template</h2>
                <p>This template will be rendered here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
