import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, FileText, Upload, Image, Clock, Search, Filter } from 'lucide-react';
import Layout from '../Layout/Layout';

const API_BASE_URL = 'http://localhost:8000/blogs';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null,
    imagePreview: null
  });
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);



  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json() || [];
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageSrc = (imageData) => {
    if (!imageData) return null;
    return `data:image/jpeg;base64,${imageData}`;
  };



  return (
    <Layout>
      <div className=" bg-white">

        <main className="max-w-6xl mx-auto px-4 py-4 mt-4">
          {blogs.length === 0 ? (
            <div className="text-center py-32">
              <FileText size={48} className="mx-auto text-teal-300 mb-4" />
              <h3 className="text-lg font-medium text-teal-900 mb-2">
                {blogs.length === 0 ? 'No posts yet' : 'No results found'}
              </h3>
              <p className="text-teal-500 text-sm">
                {blogs.length === 0
                  ? 'Create your first post to get started'
                  : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              {blogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className={`group cursor-pointer flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className="md:w-1/2 overflow-hidden rounded-2xl">
                    {blog.image ? (
                      <img
                        src={getImageSrc(blog.image)}
                        alt={blog.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center rounded-2xl">
                        <Image size={64} className="text-teal-300" />
                      </div>
                    )}
                  </div>

                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs text-teal-500 mb-4">
                      <time>{formatDate(blog.created_at)}</time>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4 leading-tight group-hover:text-teal-600 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-teal-600 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                      {blog.description}
                    </p>


                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {selectedBlog && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto" onClick={() => setSelectedBlog(null)}>
            <div className="max-w-4xl mx-auto px-8 py-12">
              <button
                onClick={() => setSelectedBlog(null)}
                className="mb-8 text-teal-600 hover:text-teal-900 flex items-center gap-2 text-sm font-medium"
              >
                <X size={18} />
                Close
              </button>

              {selectedBlog.image && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img src={getImageSrc(selectedBlog.image)} alt={selectedBlog.title} className="w-full h-96 object-cover" />
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-teal-500 mb-6">
                <time>{formatDate(selectedBlog.created_at)}</time>
                <span>•</span>
                <span>5 min read</span>
              </div>

              <h1 className="text-5xl font-bold text-teal-900 mb-8 leading-tight">{selectedBlog.title}</h1>

              <div className="prose prose-lg prose-teal max-w-none">
                <p className="text-teal-700 whitespace-pre-wrap leading-relaxed">{selectedBlog.description}</p>
              </div>
            </div>
          </div>
        )}


      </div>
    </Layout>

  );
}