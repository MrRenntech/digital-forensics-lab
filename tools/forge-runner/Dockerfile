FROM python:3.11-slim

# OS deps (needed for forensic tools later)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    build-essential \
    libssl-dev \
    libffi-dev \
    lsb-release \
    libxml2 \
    libxslt1.1 \
    libxslt1-dev \
    python3-dev \
    gcc \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# This is the REAL fix – copy entire build context
WORKDIR /app
COPY . /app

# Install Python deps
RUN pip install --no-cache-dir -r /app/requirements.txt

# Make the "app" package importable
ENV PYTHONPATH=/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
