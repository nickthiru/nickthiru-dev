const fs = require("fs");

class PrivacyChecker {
  checkContent(content) {
    const issues = [];
    
    // Check for sensitive information
    const sensitivePatterns = [
      /api[_-]?key/i,
      /secret/i,
      /password/i,
      /token/i,
      /credential/i,
      /private[_-]?key/i,
    ];

    sensitivePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        issues.push(`Sensitive information detected: ${pattern.source}`);
      }
    });

    // Check for customer data patterns
    const customerPatterns = [
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card numbers
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email addresses
    ];

    customerPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        issues.push(`Customer data detected: ${pattern.source}`);
      }
    });

    return {
      isSafe: issues.length === 0,
      issues,
      recommendation: issues.length > 0 ? 
        "Review and remove sensitive information before publishing" : 
        "Content is safe to publish"
    };
  }
}

module.exports = PrivacyChecker;
