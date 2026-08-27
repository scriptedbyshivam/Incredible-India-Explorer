/**
 * Folk Paintings Explorer - Interactive Logic
 * Handles dynamic card rendering, modal interactions, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Data Source
  const folkPaintings = [
    {
      id: 'madhubani',
      name: 'Madhubani (Mithila)',
      region: 'Bihar',
      medium: 'Natural Pigments on Paper/Wall',
      motif: 'Geometric Patterns & Deities',
      gi: 'Yes (2007)',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Originating from the Mithila region, this art form is characterized by intricate geometric patterns and vibrant natural colors.',
      description: 'Madhubani painting originated in the Mithila region of Bihar. Traditionally done by women on the walls and floors of their homes during festivals and weddings, it features eye-catching geometrical patterns and vibrant colors derived from plants and minerals. Themes often include Hindu deities, royal courts, and social events.'
    },
    {
      id: 'warli',
      name: 'Warli',
      region: 'Maharashtra',
      medium: 'White Rice Paste on Mud Walls',
      motif: 'Cycle of Life & Nature',
      gi: 'No',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A tribal art form using basic geometric shapes like circles, triangles, and squares to depict the tribal way of life.',
      description: 'Warli painting is a tribal art form practiced by the Warli tribe of the Sahyadri range in Maharashtra. Dating back to 2500 BCE, it uses a simple visual language of basic geometric shapes: a circle (sun/moon), a triangle (mountains/trees), and a square (sacred enclosure). The central motif is often the "Tarang" or "Chauk", depicting the goddess of fertility.'
    },
    {
      id: 'pattachitra',
      name: 'Pattachitra',
      region: 'Odisha',
      medium: 'Canvas & Natural Colors',
      motif: 'Jagannath & Epics',
      gi: 'Yes (2023)',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80',
      excerpt: 'An ancient scroll painting tradition from Odisha, heavily featuring the iconography of Lord Jagannath and mythological tales.',
      description: 'Pattachitra, literally "cloth painting" (Patta = cloth, Chitra = picture), is a traditional scroll painting art from Odisha. The artists, known as Chitrakars, prepare the canvas by layering cloth with a mixture of chalk and gum. The paintings predominantly feature the Jagannath triad and episodes from the Ramayana and Mahabharata, using bold outlines and vibrant, unmixed colors.'
    },
    {
      id: 'gond',
      name: 'Gond',
      region: 'Madhya Pradesh',
      medium: 'Natural Colors on Canvas',
      motif: 'Animals & Mythological Creatures',
      gi: 'No',
      image: 'https://images.unsplash.com/photo-1596727147097-675575d75371?auto=format&fit=crop&w=600&q=80',
      excerpt: 'The art of the Gond tribe, known for its intricate lines, dots, and mesmerizing depictions of animals and nature.',
      description: 'Gond art is a form of Indian folk art from the Gond tribe, primarily residing in Madhya Pradesh. The name "Gond" comes from the Dravidian word "Kond", meaning "the green mountain". The art is characterized by intricate patterns made of lines and dots, which give the paintings a unique sense of texture and movement. Animals, birds, and mythological creatures are the most common subjects.'
    },
    {
      id: 'kalamkari',
      name: 'Kalamkari',
      region: 'Andhra Pradesh / Telangana',
      medium: 'Hand-painted or Block-printed Cotton',
      motif: 'Floral & Mythological',
      gi: 'Yes (2005)',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A highly stylized textile art involving hand-painting or block printing using natural dyes and a "kalam" (pen).',
      description: 'Kalamkari, meaning "pen work" (Kalam = pen, Kari = work), is a traditional Indian textile art. There are two distinct styles: Srikalahasti (entirely hand-painted, often depicting mythological scenes) and Machilipatnam (block-printed with floral motifs). The process involves over 20 meticulous steps, including treating the fabric with cow milk and sun-drying it, before applying natural dyes.'
    }
  ];

  // DOM Elements
  const gridContainer = document.getElementById('paintings-grid');
  const modal = document.getElementById('painting-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  // Modal Content Elements
  const mTitle = document.getElementById('modal-title');
  const mRegion = document.getElementById('modal-region');
  const mImage = document.getElementById('modal-image');
  const mDesc = document.getElementById('modal-description');
  const mMedium = document.getElementById('modal-medium');
  const mMotif = document.getElementById('modal-motif');
  const mGi = document.getElementById('modal-gi');

  // Render Cards
  function renderPaintings() {
    // Simulate brief loading state for UX
    setTimeout(() => {
      gridContainer.innerHTML = '';
      folkPaintings.forEach(painting => {
        const card = document.createElement('article');
        card.className = 'painting-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${painting.name}`);
        card.dataset.id = painting.id;

        card.innerHTML = `
          <div class="card-image-wrapper">
            <img src="${painting.image}" alt="${painting.name}" class="card-image" loading="lazy">
            <span class="card-badge">${painting.region}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${painting.name}</h3>
            <div class="card-region">
              <i class="fas fa-palette" aria-hidden="true"></i> ${painting.medium}
            </div>
            <p class="card-excerpt">${painting.excerpt}</p>
          </div>
        `;
        
        // Event Listeners for Card (Click & Keyboard)
        card.addEventListener('click', () => openModal(painting));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(painting);
          }
        });

        gridContainer.appendChild(card);
      });
    }, 300);
  }

  // Modal Logic
  function openModal(data) {
    mTitle.textContent = data.name;
    mRegion.textContent = data.region;
    mImage.src = data.image;
    mImage.alt = `Example of ${data.name} art`;
    mDesc.textContent = data.description;
    mMedium.textContent = data.medium;
    mMotif.textContent = data.motif;
    mGi.textContent = data.gi;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    modalCloseBtn.focus(); // Trap focus
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Listeners for Modal
  modalCloseBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initialize
  renderPaintings();
});